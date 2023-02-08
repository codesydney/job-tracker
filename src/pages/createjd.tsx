import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IJdForm {
  description: String;
}

const JdForm: NextPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJdForm>();

  const onSubmit: SubmitHandler<IJdForm> = (data) => {
    const tempValue = localStorage.getItem('jobLisId');
    if (typeof tempValue === 'string') {
      setValue(JSON.parse(tempValue));
    }

    axios
      .post('api/v1/job-descriptions', {
        rawText: data.description,
        jobListingId: value,
      })
      .then(function (response) {
        router.push('/applications');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className='grid grid-cols-12 text-xl'>
      <div className='flex flex-col col-span-10 col-start-2 md:col-span-4 md:col-start-5'>
        <span className='text-3xl font-light my-2 self-center'>
          Job Description
        </span>
        <form
          name='job_description'
          className='flex flex-col shadow-md rounded-lg text-left mt-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='h-2 bg-purple-400 rounded-t-md'></div>
          <div className='pt-2 px-5 my-2'>
            {errors.description && 'Description is required'}
          </div>
          <textarea
            rows={6}
            placeholder='Enter description here...'
            className='border px-3 py-1 mx-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md'
            {...register('description', { required: true })}
          />
          <button
            type='submit'
            className='my-4 ml-4 self-start bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default JdForm;
