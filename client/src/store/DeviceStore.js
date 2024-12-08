import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = [
      {id: 1, name: 'type1'},
      {id: 2, name: 'type2'},
      {id: 3, name: 'type3'},
    ]
    this._brands = [
      {id: 1, name: 'brand1'},
      {id: 2, name: 'brand2'},
      {id: 3, name: 'brand3'},
    ]
    this._devices = [
      {id: 1, name: 'product1', rating: 5, price: 1000},
      {id: 2, name: 'product2', rating: 5, price: 1000},
      {id: 3, name: 'product3', rating: 5, price: 1000},
    ]
    this._selectedType = {}
    this._selectedBrand = {}
    makeAutoObservable (this)
  }

  setTypes(types) {
    this._types = types
  }
  setBrands(brands) {
      this._brands = brands
  }
  setDevices(devices) {
      this._devices = devices
  }

  setSelectedType(type) {
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }

  get types() {
    return this._types
  }
  get brands() {
      return this._brands
  }
  get devices() {
      return this._devices
  }

  get selectedType() {
    return this._selectedType
  }
  get selectedBrand() {
    return this._selectedBrand
  }
}