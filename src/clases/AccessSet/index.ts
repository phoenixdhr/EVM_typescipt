export default class AccessSet {

    private _AccessSet: Map<bigint, bigint>

    constructor() {
        this._AccessSet = new Map()
    }

    store(key:bigint, value:bigint){
        this._AccessSet.set(key, value)
    }

    load(key:bigint){
        return this._AccessSet.get(key)
    }
}