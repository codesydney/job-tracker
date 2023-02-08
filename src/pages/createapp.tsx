import type { NextPage } from 'next';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

const Source = {
  LinkedIn: 'LinkedIn',
  Seek: 'Seek',
} as const;

const Status = {
  APPLIED: 'Applied',
  REJECTED: 'Rejected',
  PHONE_SCREEN: 'Phone Screen',
  INTERVIEW: 'Interview',
  JOB_OFFER: 'Job Offer',
} as const;

interface IAppForm {
  company: String;
  position: String;
  url: String;
  source: typeof Source;
  status: typeof Status;
}

const AppForm: NextPage = () => {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IAppForm>();

  const onSubmit: SubmitHandler<IAppForm> = (data) =>
    axios
      .post('api/v1/applications', {
        status: data.status,
        url: data.url,
        source: data.source,
        position: data.position,
        company: data.company,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem(
          'jobLisId',
          JSON.parse(response.data.jobListing.id)
        );

        router.push('/createjd');
      })
      .catch(function (error) {
        console.log(error);
      });

  return (
    <div className='grid grid-cols-12 text-xl'>
      <div className='flex flex-col col-span-10 col-start-2 md:col-span-4 md:col-start-5'>
        <span className='text-3xl font-light my-2 self-center'>
          Job Application
        </span>
        <form
          name='job_application'
          className='flex flex-col shadow-md rounded-lg text-left mt-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='h-2 bg-purple-400 rounded-t-md'></div>
          <label htmlFor='company' className='font-semibold ml-4 py-2'>
            Company
          </label>
          {errors.company && 'Company name is required'}
          <input
            type='text'
            placeholder='Enter company here...'
            className='border px-3 py-1 mx-4 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md'
            {...register('company', { required: true })}
          />
          <label htmlFor='position' className='font-semibold ml-4 py-2'>
            Position
          </label>
          {errors.position && 'Position is required'}
          <input
            type='text'
            placeholder='Enter positon here...'
            className='border px-3 py-1 mx-4 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md'
            {...register('position', { required: true })}
          />
          <label htmlFor='url' className='font-semibold ml-4 py-2'>
            URL
          </label>
          {errors.url && 'url is required'}
          <input
            type='text'
            placeholder='Enter url here...'
            className='border px-3 py-1 mx-4 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md'
            {...register('url', { required: true })}
          />
          <label htmlFor='source' className='font-semibold ml-4 py-2'>
            Source
          </label>
          <select
            className='max-w-[36%] border px-3 py-1 mx-4 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md'
            {...register('source')}
          >
            <option value='LinkedIn'>LinkedIn</option>
            <option value='Seek'>Seek</option>
          </select>
          <label htmlFor='status' className='font-semibold ml-4 py-2'>
            Status
          </label>
          <select
            className='max-w-[36%] border px-3 py-1 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md mx-4'
            {...register('status')}
          >
            <option value='APPLIED'>Applied</option>
            <option value='REJECTED'>Rejected</option>
            <option value='PHONE_SCREEN'>Phone Screen</option>
            <option value='INTERVIEW'>Interview</option>
            <option value='JOB_OFFER'>Job Offer</option>
          </select>
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
export default AppForm;
