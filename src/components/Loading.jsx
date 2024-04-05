import ClipLoader from 'react-spinners/ClipLoader';
// import { PropagateLoader } from 'react-spinners/PropagateLoader';

export default function Loading() {
  return (
    <div className="flex flex-row justify-center items-center mb-40">
      <ClipLoader color="#02051a" size={80} speedMultiplier={1} />
    </div>
  );
}
