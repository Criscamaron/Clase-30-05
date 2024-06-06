const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No pagamos menos $500.000</span>'

            }
        }
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia <= 0) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    `<span class="badge bg-danger">Las contratación son hasta la fecha de hoy</span>`
            }
        }
        if (id == 'run') {
            if (!validarRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>'
            }
            // else {
            //     const p = empleados.find(x => x.run == input.value)
            //     if (p && document.getElementById('btnGuardar').value != 'Editar') {
            //         input.classList.add('is-invalid')
            //         div.innerHTML = '<span class="badge bg-danger">El run ya está ingresado</span>'
            //     }
            // }
        }
        if (id == 'email') {
            if (!validarEmail(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email ingresado no es válido</span>'
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })
    //vuelve a permitir escritura en el input run    
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (formato.test(email))
        return true
    return false
}

const validarRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" '20466707-7
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') //split separa el run en dos
            const digv = tmp[1] //dígito verificador
            const rut = tmp[0] //parte númerica 
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}