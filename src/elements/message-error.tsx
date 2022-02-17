import styled from 'styled-components';

import Icon from './icon';
import Text from './text';

interface MessageErrorProps {
  children: string;
}

const Base = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

function MessageError({ children }: MessageErrorProps): JSX.Element {
  return (
    <Base>
      <Icon name="exclamation-circle" color="error" size="xs" />
      <Text size={12} color="error" variant="semi-bold">
        {children}
      </Text>
    </Base>
  );
}

export default MessageError;
