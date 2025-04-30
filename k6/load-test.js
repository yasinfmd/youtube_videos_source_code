import http from 'k6/http'
import  {check,sleep} from 'k6'

export const options = {
    // vus:200000,
    // duration:'30s'
    stages:[
        {
            duration:'30s',target:100
        },
        {
            duration:'30s',target:200
        },
        {
            duration:'1m',target:500
        },
        {
            duration:'20s',target:200
        },
        {
            duration:'30s',target:0

        }
    ]
}


export default function(){
    const res=http.get('http://localhost:5020/api/v1/test')
    check(res,{
        'status is ok':(r)=>r.status===200
    })
    sleep(1)
}