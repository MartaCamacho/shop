import './LoadingComponent.css';

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingComponent