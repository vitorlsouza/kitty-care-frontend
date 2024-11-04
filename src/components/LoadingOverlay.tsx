import { useRive } from '@rive-app/react-canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const LoadingOverlay = () => {
    const { RiveComponent } = useRive({
        src: 'riv/V2/Pulse_kitty.riv',
        autoplay: true,
    });

    const isLoading = useSelector((state: RootState) => state.ui.loading);
    console.log('Is Loading:', isLoading);

    if (!isLoading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ width: '200px', height: '200px' }}>
                {RiveComponent ? <RiveComponent /> : <div>Loading animation...</div>}
            </div>
        </div>
    );
};

export default LoadingOverlay; 