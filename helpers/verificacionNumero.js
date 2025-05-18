const verificacionNumero=(numero='0',cifra=8)=>{

        if(!isNaN(parseInt(numero))){
          const convertido= numero.toString().padStart(cifra, '0');
          return convertido
        }else{
            return false
        }

}

module.exports= {
    verificacionNumero,
}
