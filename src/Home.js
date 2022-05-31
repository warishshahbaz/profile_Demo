
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';

// regExp for phone & pincode
const phoneRegExp = /^[7-9][0-9]{9}$/
const pinCodeRegExp = /^[1-9][0-9]{5}$/

function Home() {


    // validation
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            pinCode: "",
            gender: "",
            allergies: "",
            bloodGroup: "",
            dob: "",
            Comorbidities: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('*required')
                .min(3, '*to Short')
                .max(20, 'its should not max 20'),
            lastName: Yup.string()
                .required('*required')
                .min(3, 'To Short')
                .max(20, 'its should not max 20'),
            gender: Yup.string()
                .required('*required'),
            bloodGroup: Yup.string()
                .required('*required'),
            dob: Yup.string()
                .required('*required'),
            phone: Yup.string().matches(phoneRegExp, '*Phone number is not valid')
                .required('*required')
            ,
            phone: Yup.number()
                .typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(8)
                .required('A phone number is required'),
            pinCode: Yup.string().matches(pinCodeRegExp, '*Pin number is not valid')
                .required('*required'),
        }),
        onSubmit: async (values) => {
            console.log('form saubmit', values);
            formik = " ";
            // send data to backend
            try {
                let res = await fetch("https://localhost/5000/users", {
                    method: "POST",
                    body: JSON.stringify({
                        firstName: formik.values.firstName,
                        lastName: formik.values.lastName,
                        phone: formik.values.phone,
                        pinCode: formik.values.pinCode,
                        gender: formik.values.gender,
                        allergies: formik.values.allergies,
                        bloodGroup: formik.values.bloodGroup,
                        dob: formik.values.dob,
                        Comorbidities: formik.values.Comorbidities,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let resJson = await res.json();
                console.log(resJson);
            } catch (err) {
                console.log(err);
            }
        }
    });
    // console.log(formik.errors);

    // get data from backend
    const fetchData = async () => {
        return await axios.get('https://localhost/5000/users')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <section className="main-section">
                <div className='container col col-lg-12 col-md-6 col-sm-8'>
                    <h3 className='text-center mt-4'> Demo Profile</h3>
                    <form method='post' action="post" onSubmit={formik.handleSubmit}>

                        <div className="form-group mb-4">
                            <label for="firstname" className="text">First Name</label>
                            <input type="text"
                                name='firstName'
                                className="form-control"
                                placeholder='First Name'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.firstName && formik.errors.firstName && <p style={{ color: 'red' }}>{formik.errors.firstName}</p>}
                        </div>

                        <div className="form-group mb-4">
                            <label for="lastname">Last Name</label>
                            <input type="text"
                                name='lastName'
                                className="form-control"
                                placeholder='Last Name'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.lastName && formik.errors.lastName && <p style={{ color: 'red' }}>{formik.errors.lastName}</p>}

                        </div>

                        <div className="form-group mb-4">
                            <label for="dateofbirth">Date of Birth</label>
                            <input type="date"
                                name='dob'
                                className="form-control"
                                placeholder='Last Name'
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.dob && formik.errors.dob && <p style={{ color: 'red' }}>{formik.errors.dob}</p>}

                        </div>

                        <div className="form-group mb-4">
                            <select class="p-2" onChange={formik.handleChange} name="gender" value={formik.values.gender}>
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && <p style={{ color: 'red' }}>{formik.errors.gender}</p>}
                        </div>

                        <div className="form-group mt-4">
                            <label for="exampleInputEmail1">Pin Code</label>
                            <input type="text"
                                name='pinCode'
                                className="form-control"
                                placeholder=' Pin Code '
                                value={formik.values.pinCode}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.pinCode && formik.errors.pinCode && <p style={{ color: 'red' }}>{formik.errors.pinCode}</p>}

                        </div>

                        <div className="form-group mt-4">
                            <label for="contactnumber">Contact Number</label>
                            <input type="text"
                                name='phone'
                                className="form-control"
                                placeholder='Phone Number'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.phone && formik.errors.phone && <p style={{ color: 'red' }}>{formik.errors.phone}</p>}

                        </div>

                        <div className="form-group mt-3">
                            <select class="p-2" onChange={formik.handleChange} name='bloodGroup' value={formik.values.bloodGroup}>
                                <option value="">Blood Group </option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O</option>
                            </select>
                            {formik.touched.bloodGroup && formik.errors.bloodGroup && <p style={{ color: 'red' }}>{formik.errors.bloodGroup}</p>}

                        </div>

                        <div className="form-group mt-4">
                            <select class="browser-default custom-select p-2" onChange={formik.handleChange} name='allergies' value={formik.values.allergies}>
                                <option selected>Allergies</option>
                                <option value="sneezing and an itchy">sneezing and an itchy</option>
                                <option value="runny or blocked nose ">runny or blocked nose </option>
                                <option value="red rash">red rash</option>
                                <option value="tummy pain">tummy pain</option>
                                <option value="vomiting or diarrhoea">vomiting or diarrhoea</option>
                                <option value="Other">Other</option>
                            </select>
                            {formik.touched.allergies && formik.errors.allergies && <p style={{ color: 'red' }}>{formik.errors.allergies}</p>}

                        </div>
                        <div className="form-group mt-4">
                            <select class="browser-default custom-select p-2" onChange={formik.handleChange} name='Comorbidities' value={formik.values.Comorbidities}>
                                <option selected>Co-morbidities</option>
                                <option value="Heart disease">Heart disease</option>
                                <option value="High blood pressure ">High blood pressure.</option>
                                <option value="Respiratory disease">Respiratory disease</option>
                                <option value="Joint disease">Joint disease</option>
                                <option value="Diabetes">Diabetes</option>
                                <option value="Other">Other</option>
                            </select>
                            {formik.touched.Comorbidities && formik.errors.Comorbidities && <p style={{ color: 'red' }}>{formik.errors.Comorbidities}</p>}
                        </div>
                        <button type='submit' className=" btn btn-info  px-4 py-2 text-light mt-4 mb-3 text">Submit</button>
                    </form>
                </div>
            </section>

        </>
    );
}

export default Home;
