import { Skeleton } from 'antd'
import { SkeletonInputProps } from 'antd/lib/skeleton/Input'
import styled from 'styled-components'

const StyledLoadingWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledInput = styled(Skeleton.Input)`
  width: 100%;
  margin-bottom: 5px;
`

const defaultStyle: React.CSSProperties = {
  borderRadius: '10px'
}

const loadingBlocks: SkeletonInputProps[] = [
  {
    style: {
      height: '200px'
    }
  },
  {
    style: {
      width: '30%'
    }
  },
  {
    style: {
      width: '70%'
    }
  },
  {
    style: {
      width: '50%'
    }
  },
  {
    style: {
      width: '100%',
      height: '300px',
      marginTop: '1.5rem'
    }
  },
  {
    style: {
      width: '100%',
      marginTop: '1.5rem'
    }
  },
  {
    style: {
      width: '70%'
    }
  },
  {
    style: {
      width: '50%'
    }
  },
  {
    style: {
      width: '80%'
    }
  },
  {
    style: {
      width: '40%'
    }
  },
  {
    style: {
      width: '60%'
    }
  },
  {
    style: {
      width: '50%'
    }
  },
  {
    style: {
      width: '100%'
    }
  }
]

const FullLoading: React.FC = () => {
  return (
    <StyledLoadingWrapper>
      {loadingBlocks.map((block, i, _) => (
        <StyledInput
          key={i}
          size="small"
          active
          style={{ ...block.style, ...defaultStyle }}
        />
      ))}
    </StyledLoadingWrapper>
  )
}

export { FullLoading }
