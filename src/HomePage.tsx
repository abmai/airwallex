import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import RequestInviteForm from './RequestInviteForm';
import Button from './Button';

// Set root app element for modal accessibility
// http://reactcommunity.org/react-modal/accessibility/
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  function onRequestInviteClick() {
    setIsModalOpen(true);
  }

  function onModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="w-screen h-screen pt-20 pb-20 flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center font-medium">
          a better way
          <br />
          to enjoy every day.
        </h1>
        <h2 className="mt-4 text-2xl">be the first to know when we launch.</h2>
        <Button className="mt-6" onClick={onRequestInviteClick}>
          Request an Invite
        </Button>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={onModalClose}
        className="w-96 border p-6 bg-white"
        overlayClassName="flex flex-col justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-white bg-opacity-75"
      >
        <RequestInviteForm onFinish={onModalClose} />
      </ReactModal>
    </>
  );
}
