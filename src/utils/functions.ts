export function fdx(coeffs:number[]):number[]{
    let ddx:number[] = []
    for (let i = 0; i< coeffs.length; i++){
        ddx.push(coeffs[i]*(i))
    }
    ddx = ddx.slice(1)
    return ddx
}

export function fox(coeffs:number[],x:number):number{
    let y:number = 0
    for(let i=0; i<coeffs.length; i++){
        y += coeffs[i]*Math.pow(x,i)
    }
    return Number(y.toFixed(4))
}

export function getDegree(coeffs:number[]):number{
    let dud:number = 0
    for (let i=coeffs.length-1;i>=0;i--){
        if(coeffs[i]==0){
            dud+=1
        }else{
            break
        }
    }
    let degree:number = coeffs.length-1-dud
    return degree
}

export function cleanCoeffs(coeffs:number[]):number[]{
    let cleanCoeffs: number[] = []
    let dud:number = 0
    for (let i=coeffs.length-1;i>=0;i--){
        if(coeffs[i]==0){
            dud+=1
        }else{
            break
        }
    }
    cleanCoeffs = coeffs.slice(0,coeffs.length-dud)
    return cleanCoeffs
}

export function longDivisionTemp(cfsDividend:number[],cfsDivisor:number[]):number[]{
    let cQuo: number[] = []
    let cDnd: number[] = cfsDividend.slice().reverse()
    let cDvr: number[] = cfsDivisor.slice().reverse()

    for(let i=0;i<cDnd.length-1;i++){
        let _q:number = cDnd[i]/cDvr[0]
        cQuo.push(_q)
        cDnd[i+1] = cDnd[i+1] - (_q*cDvr[1])
    }

    cQuo = cQuo.reverse()
    return cQuo
}

export function pDivision(cfsDividend:number[],cfsDivisor:number[]):number[][]{
    let cQuo: number[] = []
    let cRem: number[] = []
    let cDnd: number[] = cfsDividend.slice().reverse()
    let cDvr: number[] = cfsDivisor.slice().reverse()

    for(let i=0;i<cDnd.length-cDvr.length+1;i++){
        let _q:number = cDnd[i]/cDvr[0]
        cQuo.push(_q)
        for(let j=0;j<cDvr.length-1;j++){
            cDnd[i+j+1] = cDnd[i+j+1]- (_q*cDvr[j+1])
            if(i===cDnd.length-cDvr.length){
                cRem.push(cDnd[i+j+1])
            }
        }
    }

    cQuo = cQuo.reverse()
    cRem = cleanCoeffs(cRem.reverse())
    return [cQuo,cRem]
}

export function pMultiplication(pol1:number[],pol2:number[]):number[]{
    let degreePol1:number = this.getDegree(pol1)
    let degreePol2:number = this.getDegree(pol2)
    let product:number[] = new Array(degreePol1+degreePol2+1).fill(0)

    for(let i=0;i<pol1.length;i++){
        for(let j=0;j<pol2.length;j++){
            product[i+j]+=(pol1[i]*pol2[j])
        }
    }

    return product
}

export function pAddition(pol1:number[],pol2:number[]):number[]{
    let degreePol1:number = this.getDegree(pol1)
    let degreePol2:number = this.getDegree(pol2)
    let degreeSum:number = Math.max(degreePol1,degreePol2)
    let sum:number[] = new Array(degreeSum+1).fill(0)

    if(degreePol1<=degreePol2){
        for(let i =0 ;i<degreePol2-degreePol1;i++){
            pol1.push(0)
        }
    }else{
        for(let i =0 ;i<degreePol1-degreePol2;i++){
            pol2.push(0)
        }
    }

    for(let i=0;i<sum.length;i++){
        sum[i]+= pol1[i]+pol2[i]
    }

    return sum
}