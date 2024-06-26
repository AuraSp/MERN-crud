import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';

import './AddForm.css';

function AddTeacherV1({onToggle, version}) {
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [town, setTown] = useState('');
    const [subject, setSubject] = useState('');
    const [subjectGroup, setsubjectGroup] = useState('');

    const userSchema = yup.object().shape({
        name: yup
            .string()
            .nullable(false)
            .typeError('Invalid Input: Must be letters')
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter a name'),
        surname: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter a surname'),
        birthdate: yup
            .date()
            .nullable()
            .min(new Date(1950, 1, 1), 'Cannot use past date')
            .max(new Date(), "Cannot use future date")
            .typeError('Date birth must be entered')
            .required(),
        town: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required(),
        subject: yup
            .string()
            .nullable(false)
            .strict()
            .required('Must be chosen'),
        subjectGroup: yup
            .string()
            .nullable(false)
            .strict()
            .required('Must be chosen')
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = () => {
        fetch(process.env.REACT_APP_API_URL_TEACHERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                birthdate: birthdate,
                town: town,
                subject: subject,
                subjectGroup: subjectGroup,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.info('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        Swal.fire({
            title: 'Registration successful',
            text: `Data has been sent to our database`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        reset(
            setName(),
            setSurname(),
            setBirthdate(),
            setTown(),
            setSubject(),
            setsubjectGroup()
        );
    };

    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 nav-list p-4'>
                <div className='d-flex flex-row align-items-center text-center'>
                    <Link to="/" onClick={onToggle} className='navItem fw-bold mx-1 p-2 border border-white rounded-pill text-decoration-none'>Home</Link>
                    <Link to={`${version}/students`} className='navItem fw-bold mx-1 p-2 border border-white rounded-pill text-decoration-none'>Students Page</Link>
                    <Link to={`${version}/teachers`} className='navItem fw-bold mx-1 p-2 border border-white rounded-pill text-decoration-none'>Teachers Page</Link>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='form d-flex flex-column justify-content-center m-auto p-2 w-25'>

                <h3 className='text-center my-4 fw-bold text-white'>Teacher registration</h3>

                <p className={errors.name ? 'text-danger text-center ' : ''}><input
                    {...register('name')}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Example: Bob"
                    className='border-0 rounded m-1 p-1 w-100 text-secondary text-center'
                />
                    {errors.name?.message}</p>
                <p className={errors.surname ? 'text-danger text-center ' : ''}><input
                    {...register('surname')}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Example: Smith"
                    className='border-0 rounded m-1 p-1 w-100 text-secondary text-center'
                />
                    {errors.surname?.message}</p>
                <p className={errors.birthdate ? 'text-danger text-center ' : ''}><input
                    {...register('birthdate')}
                    onChange={(e) => setBirthdate(e.target.value)}
                    placeholder='Example: yyyy-mm-dd'
                    className='border-0 rounded m-1 p-1 w-100 text-secondary text-center'
                />
                    {errors.birthdate?.message}</p>
                <p className={errors.town ? 'text-danger text-center ' : ''}><input
                    {...register('town')}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="Example: Kaunas"
                    className='border-0 rounded m-1 p-1 w-100 text-secondary text-center'
                />
                    {errors.town?.message}</p>
                <p className={errors.subject ? 'text-danger text-center ' : ''}>
                    <select
                        {...register('subject')}
                        onChange={(e) => setSubject(e.target.value)}
                        defaultValue=''
                        className='border-0 rounded p-1 m-1 w-100 text-secondary text-center'
                    >
                        <option value='' disabled>---Choose your subject--</option>
                        <option value='Javascript'>JavaScript</option>
                        <option value='Java'>Java</option>
                        <option value='PHP'>PHP</option>
                        <option value='Tester'>Programinės įrangos testuotojas</option>
                    </select>
                    {errors.subject?.message}</p>
                <p className={errors.subjectGroup ? 'text-danger text-center ' : ''}>
                    <select
                        {...register('subjectGroup')}
                        onChange={(e) => setsubjectGroup(e.target.value)}
                        defaultValue=''
                        className='border-0 rounded p-1 m-1 w-100 text-secondary text-center'
                    >
                        <option value='' disabled>---Choose your subject group--</option>
                        <option value='1'>1 grupė</option>
                        <option value='2'>2 grupė</option>
                        <option value='3'>3 grupė</option>
                    </select>
                    {errors.subjectGroup?.message}</p>

                <div className='text-center'>
                    <button type="submit" className='btn btn-secondary text-white w-75 m-1 submit'>Create</button>
                </div>
            </form>
        </div >
    );
}
export default AddTeacherV1;
