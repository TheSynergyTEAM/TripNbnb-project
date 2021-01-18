import styled from 'styled-components'

interface OverlayProps {
  title: string
}

const StyledOverlay = styled.div`
  background-color: white;
  border-radius: 7px;
  padding: 1rem;
  position: relative;
`

const StyledSpeech = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  top: 100%;
  left: 50%;
  border: 0.75rem solid transparent;
  border-bottom: none;
  border-top-color: white;
  content: '';
`

const StyledText = styled.div`
  font-weight: bold;
`

const HighlightOverlay: React.FC<OverlayProps> = ({ title }) => {
  return (
    <StyledOverlay className="shadow-box highlight-overlay">
      <StyledText>{title}</StyledText>
      <StyledSpeech className="shadow-box highlight-overlay-speech-bubble" />
    </StyledOverlay>
  )
}

export default HighlightOverlay
