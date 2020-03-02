import { RouteComponentProps } from 'react-router';
import { Href } from 'history';

export function getMockRouterProps<P>(data: P): RouteComponentProps {
  const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  };

  const props: RouteComponentProps<P> = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: '',
    },
    location: location,
    history: {
      length: 2,
      action: 'POP',
      location: location,
      push: () => {},
      replace: () => {},
      go: () => {},
      goBack: () => {},
      goForward: () => {},
      block: () => () => {},
      createHref: () => {
        const temp: Href = '';
        return temp;
      },
      listen: () => () => {},
    },
    staticContext: {},
  };

  return props;
}
