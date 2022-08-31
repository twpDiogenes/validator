interface validator  {
    alias: string
    validator: Function
}

/// NOTE *************************UTILITY FUNCTIONS******************************************//
const grabValue = (event: Event)=>{
    const target = event.target as HTMLInputElement
    return {
        "target": target,
        "value": target.value
    }
}

const setStyle = (element: HTMLElement, style: string)=>{
    let currentState = element.style.cssText
    let newState = currentState + ' ' + style + ';'
    console.log(element.style.cssText);
    element.style.cssText = newState

}

const insertWarning = (target: HTMLElement)=>{
    const warning = document.createElement("span")
    warning.style.cssText = ""
    target.after(warning, "Test")
}


// NOTE ****************************************************CORE*******************************************************************************************/
const inputs = document.querySelectorAll("input[type='text']")

inputs.forEach( element => {
    element.addEventListener(
        'input', (event)=>{
            whatValidator(event)
        }
    )
    
});
//***************************************************************************************************************************************************** */

const whatValidator = (wvValue:Event)=>{
    const target = wvValue.target as HTMLInputElement
    const wv : string = target.getAttribute('wv')
    const rules = wv.split(' ')
    rules.forEach(rule => {
        validators.forEach(validator => {
            if (validator.alias==rule) {
                validator.validator(wvValue)
            }
        });
    });
    // alphaOnly.validator(wvValue)
    
}

 

// NOTE **************************************************VALIDATORS***************************************************************** */
const alphaOnly: validator = {
    alias: 'alpha',
    validator: (event: Event)=>{
        const target = event.target as HTMLInputElement
        const value = target.value
        if(Number.isInteger(Number(value))){        
            target.style.cssText = "outline-color: red"
        }else{
            target.style.cssText = ""
        }
    }
}

const numOnly: validator = {
    alias: 'num',
    validator: (event: Event)=>{
        const target = event.target as HTMLInputElement
        const value = target.value
        insertWarning(target)      
        if(!Number.isInteger(Number(value))){        
            target.style.cssText = "outline-color: red"
        }else{
            target.style.cssText = ""
        }
    }
}

const email: validator = {
    alias: 'email',
    validator: (event : Event)=>{

    }
}

const hasOneUpperCase: validator = {
    alias: '1up',
    validator: (event: Event)=>{
        const { target, value } = grabValue(event)
        console.log('trigger');
        for(let char of value) {
            if (char!==char.toUpperCase()) {
                setStyle(target, "outline-color: red")
                // target.style.cssText = "outline-color: red"
            }else{
                target.style.cssText = ""
                break
            }
            
        }
        
    }
}


const validators = [
    alphaOnly,
    numOnly,
    hasOneUpperCase
]

// NOTE *****************************************************************REGEX******************************************************************* */
const numericOnly: RegExp = /[A-B]/