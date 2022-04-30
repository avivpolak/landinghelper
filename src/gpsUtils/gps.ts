export const getDiractrionAndSpeed=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(returnPosition);
      } else {
        return undefined 
    }
}
const returnPosition = (position:any)=>{
    console.dir(position)
}