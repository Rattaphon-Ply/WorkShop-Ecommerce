export const numberFormatAddTH =(num)=>{
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(num)
}

export const numberFormat =(num)=>{
    return new Intl.NumberFormat('th-TH').format(num)
}