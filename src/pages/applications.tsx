import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SOURCE = {
  LinkedIn: 'LinkedIn',
  Seek: 'Seek',
} as const;

type Source = keyof typeof SOURCE;

const STATUS = {
  APPLIED: 'Applied',
  REJECTED: 'Rejected',
  PHONE_SCREEN: 'Phone Screen',
  INTERVIEW: 'Interview',
  JOB_OFFER: 'Job Offer',
} as const;

type Status = keyof typeof STATUS;

interface IJobDescription {
  rawText: String;
}

interface IJobListing {
  company: String;
  position: String;
  url: String;
  source: Source;
  status: Status;
  jobDescription: IJobDescription;
}

interface IApplication {
  id: Number;
  jobListingId: Number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  jobListing: IJobListing;
}

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<IApplication[] | undefined>(
    undefined
  );

  const router = useRouter();

  const handleAddNew = () => {
    router.push('/createapp');
  };

  const [isOpen, setIsOpen] = useState<boolean[]>([]);

  const handleOpen = (index: number) => {
    let newArr = [...isOpen];

    if (!newArr[index]) {
      newArr[index] = true;
    } else {
      newArr[index] = false;
    }

    setIsOpen(newArr);
  };

  useEffect(() => {
    axios
      .get('api/v1/applications')
      .then(function (response) {
        setApplications(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className='grid grid-cols-12 text-xl'>
      <div className='flex flex-col col-span-10 col-start-2'>
        <button
          type='submit'
          className='my-4 ml-4 self-start bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600'
          onClick={handleAddNew}
        >
          Add New
        </button>

        <div className='h-2 bg-purple-400 rounded-t-md'></div>

        {applications &&
          applications.map((application, index) => {
            const { id, status, updatedAt } = application;
            const { position, company, source } = application.jobListing;
            const { rawText } = application.jobListing.jobDescription;
            const idStr = id.toString();
            var updated = new Date(updatedAt).toLocaleDateString();

            return (
              <div
                className='shadow-md rounded-lg flex flex-wrap py-2 my-2 hover:bg-purple-50'
                key={index}
              >
                <div className='flex basis-full'>
                  <div className='mx-2'>{idStr}</div>
                  <div className='mx-2'>{position}</div>
                  <div className='mx-2'>{company}</div>
                  <div className='mx-2'>{status}</div>
                  <div className='mx-2'>{source}</div>
                  <div className='mx-2'>{updated}</div>
                  <div
                    className='flex cursor-pointer'
                    onClick={() => handleOpen(index)}
                  >
                    <div>Read More</div>

                    <Image
                      src='/down.svg'
                      alt='Edit button'
                      className='mx-2'
                      width={20}
                      height={20}
                    />
                  </div>

                  <Image
                    src='/trash.svg'
                    alt='Delete button'
                    className='mx-2'
                    width={20}
                    height={20}
                  />
                  <Image
                    src='/edit.svg'
                    alt='Edit button'
                    className='mx-2'
                    width={20}
                    height={20}
                  />
                </div>
                <div className='mx-2'>{isOpen[index] ? rawText : ''}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Applications;
