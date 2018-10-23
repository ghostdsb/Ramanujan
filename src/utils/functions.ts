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
    let cDnd: number[] = cfsDividend.reverse()
    let cDvr: number[] = cfsDivisor.reverse()

    for(let i=0;i<cDnd.length-1;i++){
        let _q:number = cDnd[i]/cDvr[0]
        cQuo.push(_q)
        cDnd[i+1] = cDnd[i+1] - (_q*cDvr[1])
    }

    cQuo = cQuo.reverse()
    return cQuo
}