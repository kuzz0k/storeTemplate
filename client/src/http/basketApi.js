import { $authHost } from "./index";


export const showCart = async () => {
  const {data} = await $authHost.get('api/basket')
  return data
}

export const addToCart = async ( deviceId, quantity = 1 ) => {
  const {data} = await $authHost.post('api/basket/add', { deviceId, quantity })
  return data
}

export const removeFromCart = async ( deviceId ) => {
  const {data} = await $authHost.delete('api/basket/delete/', { deviceId })
  return data
}

export const updateCart = async (deviceId, newQuantity) => {
  const {data} = await $authHost.patch('api/basket/update', { deviceId, newQuantity })
  return data
}