import {useEffect, useState} from 'react';
import ReactModal from 'react-modal';

// // Set root app element for modal accessibility
// // http://reactcommunity.org/react-modal/accessibility/
// ReactModal.setAppElement('#root');

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

  }, []);

  function onRequestInviteClick() {
    setIsModalOpen(true);
  }

  function onModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="w-screen h-screen pt-20 pb-20 flex flex-col justify-center items-center">
        <h1>a better way to enjoy every day.</h1>
        <h5 className="mt-4">be the first to know when we launch.</h5>
        <button className="mt-4" onClick={onRequestInviteClick}>request an invite</button>
      </div>

      <ReactModal isOpen={isModalOpen} onRequestClose={onModalClose}>
        <h1>Request an Invite</h1>
      </ReactModal>
    </>
  )
}