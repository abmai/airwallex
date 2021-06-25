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
        <h1 className="text-4xl lg:text-6xl text-center font-bold lg:font-semibold">
          a better way
          <br />
          to enjoy every day.
        </h1>
        <h2 className="mt-4 text-lg lg:text-2xl">
          be the first to know when we launch.
        </h2>
        <Button className="mt-12" onClick={onRequestInviteClick}>
          Request an Invite
        </Button>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={onModalClose}
        className="w-80 lg:w-96 max-h-128 rounded-lg p-6 transition-all bg-white shadow-modal flex flex-col text-primary"
        overlayClassName="flex flex-col justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-white bg-opacity-80"
      >
        <RequestInviteForm onFinish={onModalClose} />
      </ReactModal>
    </>
  );
}
