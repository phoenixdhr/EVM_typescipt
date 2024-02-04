// Definiciones iniciales
value: valor desde la entrada de la pila.
current_value: valor actual del slot de almacenamiento.
original_value: valor del slot de almacenamiento antes de la transacción actual.

static_gas = 0
// No se añade gas estático para SSTORE, es siempre 0.

// Cálculo del gas dinámico base
if value == current_value:
    // Si el valor a almacenar es igual al valor actual, el costo es mínimo.
    base_dynamic_gas = 100
    
else if current_value == original_value:
    if original_value == 0:
        // Costo elevado para almacenar un nuevo valor no cero en un slot previamente vacío.
        base_dynamic_gas = 20000
    else:
        // Costo moderado para cambiar un valor no cero que no ha sido modificado en esta transacción.
        base_dynamic_gas = 2900
else:
    // Costo estándar para la modificación de valores.
    base_dynamic_gas = 100


// Costo adicional para slots "fríos"
// Un slot se considera "frío" si no ha sido leído ni escrito en la transacción actual.
if slot is cold:  base_dynamic_gas += 2100




// Reembolsos de gas
if     value != current_value        and        current_value == original_value:
    if original_value != 0 and value == 0:
        // Reembolso por liberar un slot (cambio de un valor no cero a cero).
        gas_refunds += 4800
else if current_value != original_value:
    if original_value != 0:
        if current_value == 0:
            // No hay reembolso si se está reutilizando un slot liberado previamente.
            gas_refunds -= 4800
        elif value == 0:
            // Reembolso por liberar un slot, si el valor actual se cambia a cero.
            gas_refunds += 4800
    if value == original_value:
        // Reembolsos adicionales si se restaura el valor original del slot en la transacción.
        if original_value == 0:
            // Reembolsos específicos dependiendo de si el slot ha sido calentado o enfriado.
            gas_refunds += key is warm ? 20000 - 100 : 19900
        else:
            gas_refunds += key is warm ? 5000 - 2100 - 100 : 4900
