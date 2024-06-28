const empleados = [
    {
        id: 1,
        nombre: 'Agustin'
    },
    {
        id: 2,
        nombre: 'Fernando'
    },
    {
        id: 3,
        nombre: 'Javier'}
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
]

const getEmpleado = (id) => {
    return promesa = new Promise((resolve, reject) => {
        const empleado = empleados.find( (e) => e.id === id )?.nombre;

        ( empleado ) 
            ?resolve( empleado )
            :reject(`No existe el empleado con id ${id}`);
        
    });
}

const getSalario = (id) => {
    return promesa = new Promise((resolve, reject) => {
        const salario = salarios.find( (s) => s.id === id )?.salario;

        ( salario )
            ?resolve( salario )
            :reject(`No existe el salario para el id ${id}`);
    })
}

let nombre;

getEmpleado(3)
    .then( empleado => {
        nombre = empleado
        return getSalario(3); 
    })
    .then( salario => console.log(`El empleado ${nombre} tiene un salario de ${salario}`) )
    .catch( err => console.log(err) )