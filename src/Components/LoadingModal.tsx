import './modal.scss';


const LoadingModal = ({ show, onClose }: any) => {
   
      if (!show) return null;

    return (
        <div className="modal-overlay" onClick={() => onClose(!show)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => onClose(!show)}>
                    &times;
                </button>
                <div className="modal-content">
                    <h1 style={{textAlign:'center'}}>Updating your changes</h1>

                </div>
            </div>
        </div>
    );
};

export default LoadingModal;
