// import React from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';

// function Editinfo() {

//     return (
//         <form onSubmit={}
//             className='form d-flex flex-column justify-content-center m-auto p-2 w-25'>

//             <input
//                 value={}
//                 onChange={}
//                 placeholder="name"
//                 className='border border-2 m-1 w-100'
//             />

//             <button>Update user</button>
//             <button
//                 className="button muted-button">
//                 Cancel
//             </button>
//             {/* <input
//                 {...register('surname')}
//                 onChange={(e) => setSurname(e.target.value)}
//                 placeholder="surname"
//                 className='border border-2 m-1 w-100'
//             />
//                 {errors.surname?.message}</p>
//             <p className={errors.birthdate ? 'text-danger text-center ' : ''}><input
//                 {...register('birthdate')}
//                 onChange={(e) => setBirthdate(e.target.value)}
//                 placeholder='yyyy-mm-dd'
//                 className='border border-2 m-1 w-100'
//             />
//                 {errors.birthdate?.message}</p>
//             <p className={errors.town ? 'text-danger text-center ' : ''}><input
//                 {...register('town')}
//                 onChange={(e) => setTown(e.target.value)}
//                 placeholder="town"
//                 className='border border-2 m-1 w-100'
//             />
//                 {errors.town?.message}</p>
//             <p className={errors.subject ? 'text-danger text-center ' : ''}>
//                 <select
//                     {...register('subject')}
//                     onChange={(e) => setSubject(e.target.value)}
//                     defaultValue=''
//                     className='border border-2 bg-transparent m-1 w-100'
//                 >
//                     <option value='' disabled>---Choose your subject--</option>
//                     <option value='Javascript'>JavaScript</option>
//                     <option value='Java'>Java</option>
//                     <option value='PHP'>PHP</option>
//                     <option value='Tester'>Programinės įrangos testuotojas</option>
//                 </select>
//                 {errors.subject?.message}</p>
//             <p className={errors.subjectGroup ? 'text-danger text-center ' : ''}>
//                 <select
//                     {...register('subjectGroup')}
//                     onChange={(e) => setsubjectGroup(e.target.value)}
//                     defaultValue=''
//                     className='border border-2 bg-transparent m-1 w-100'
//                 >
//                     <option value='' disabled>---Choose your subject group--</option>
//                     <option value='1'>1 grupė</option>
//                     <option value='2'>2 grupė</option>
//                     <option value='3'>3 grupė</option>
//                 </select>
//                 {errors.subjectGroup?.message}</p>

//             <div className='text-center'>
//                 <button type="submit" className='btn btn-secondary text-warning w-75 m-1 submit'>Create</button> <button type="submit" className='btn btn-secondary text-warning w-75 m-1 submit'>Create</button>
//             </div> */}
//         </form>
//     )
// }

// export default Editinfo;

import React from 'react';
import { useState } from 'react';
import { MdCancel, MdCheckCircle } from "react-icons/md";

import './EditInfo.css';

function EditStudent({ data, onCancel, onSubmit }) {
    const [name, setName] = useState(data.name);
    const [surname, setSurname] = useState(data.surname);
    const [birthdate, setBirthdate] = useState(data.birthdate);
    const [town, setTown] = useState(data.town);
    const [program, setProgram] = useState(data.program);
    const [group, setGroup] = useState(data.group);

    const editStudent = (e) => {
        e.preventDefault();
        let updatedData = {
            name: name,
            surname: surname,
            birthdate: birthdate,
            town: town,
            program: program,
            group: group
        }
        onSubmit(e, updatedData)
    }

    return (
        <tr id='edit-row'>
            <td>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                </input>
            </td>
            <td>
                <button
                    className='cancel border-0 btn btn-danger text-warning mt-2 me-1'
                    onClick={() => { onCancel() }}><MdCancel />
                </button>
                <button
                    className='check border-0 btn btn-secondary text-warning mt-2 ms-1'
                    onClick={(e) => { editStudent(e) }}><MdCheckCircle />
                </button>
            </td>
        </tr >
    )
}

export default EditStudent
