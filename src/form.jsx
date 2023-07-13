import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import './form.css'

export default function Form() {
  const {control, register, handleSubmit, watch, formState: { errors } } = useForm();

  const options = [
    { value: 'fullstack', label: 'Full Stack Developer'},
    { value: 'backend', label: 'Backend Developer' },
    { value: 'frontend', label: 'Frontend Developer'},
  ];

  const onSubmit = data => console.log(data);



//   PASSWORD VALIDATION
  const validatePassword = (value) => {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const numbers = /[0-9]{4}/;
    const capitalLetters = /[A-Z]{2}/;
    const smallLetters = /[a-z]{2}/;

    if(
        specialChars.test(value) &&
        (value.match(numbers) || [])[0]?.length >= 4 &&
        (value.match(capitalLetters) || [])[0]?.length >= 2 &&
        (value.match(smallLetters) || [])[0]?.length >= 2
    ){
        return true
    }else{
        return false
    }
  };


//   PASSWORD MACTH VALIDATION
  const validatePasswordMatch = (value) => {
    const password = watch('password');

    if (value !== password) {
      return 'Passwords do not match';
    }

    return true;
  };


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration Form</h1>

        <div>
            <label>
                Name : 
            </label>
            <input type="text" {...register("Name", { required: true })}  />
        </div> 
 
        <div>
            <label>
                Mobile No : 
            </label>
            <input type="text" id="mobileNumber"  {...register('mobileNumber', { required: 'Mobile number is required',
                    pattern: {
                    value: /^[0-9+\-]+$/,
                    message: 'Invalid mobile number',
                    },
                })}/>
            {errors.mobileNumber && (
                <span role="alert" style={{ color: 'red' }}>
                {errors.mobileNumber.message}
                </span>
            )}
        </div>


        <div>
            <label>
                Email : 
            </label>
            <input type="email" id="email" {...register('email',{ required: 'Mobile number is required', pattern:{
                    message: 'Invalid Email'
                } })}  />

            {errors.email && (
                <span role="alert" style={{ color: 'red' }}>
                    {errors.email.message}
                </span>
            )}
        </div> 

        <div>

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                {...register('password', {
                required: 'Password is required',
                validate: validatePassword,
                })}
            />

            {errors.password && (
                <span role="alert" style={{ color: 'red' }}>
                {errors.password.message}
                </span>
            )}
        </div>



        <div>
            <label htmlFor="reenterPassword">Re-enter Password</label>
            <input
                type="password"
                id="reenterPassword"
                {...register('reenterPassword', {
                required: 'Re-enter password is required',
                validate: validatePasswordMatch,
                })}
            />
            {errors.reenterPassword && (
                <span role="alert" style={{ color: 'red' }}>
                {errors.reenterPassword.message}
                </span>
            )}
        </div> 

        <div>
            <Controller
                control={control}
                name="selectField"
                rules={{ required: 'Select field is required' }}
                render={({ field }) => (
                <Select
                style={{color:'red'}}
                    {...field}
                    options={options}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                />
                )}
            />
            {errors.selectField && (
                <span role="alert" style={{ color: 'red' }}>
                {errors.selectField.message}
                </span>
            )}
        </div>


        <div style={{marginTop:'15px',marginBottom:'15px'}} >
            <label htmlFor="radioOption1">
                <input
                type="radio"
                id="radioOption1"
                value="male"
                {...register('radioField', { required: 'Radio field is required' })}
                />
                Male
            </label>

            <label htmlFor="radioOption2">
                <input
                type="radio"
                id="radioOption2"
                value="female"
                {...register('radioField', { required: 'Radio field is required' })}
                />
                Female
            </label>
            {errors.radioField && (
                <span role="alert" style={{ color: 'red' }}>
                {errors.radioField.message}
                </span>
            )}
      </div> 

      
    
      

 
        <label style={{fontWeight:'300'}} htmlFor="checkboxField">
            <input
            type="checkbox"
            id="checkboxField"
            {...register('checkboxField', { required: 'Checkbox field is required' })}
            />
            Remember me
        </label>
        {errors.checkboxField && (
            <span role="alert" style={{ color: 'red' }}>
            {errors.checkboxField.message}
            </span>
        )}
      
        <input className="button" type="submit" />

    </form>
    </>
  );
}