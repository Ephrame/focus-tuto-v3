import React from 'react';
import {connect as connectToStore} from 'react-redux';

// focus-application
import Layout from 'focus-application/layout'
import ScrollTrigger from 'focus-application/layout/scroll-trigger';
import LoadingBar from 'focus-application/fetch'
import ConfirmWrapper from 'focus-application/confirm';
import MessageCenter from 'focus-application/messages';
import Header from 'focus-application/header';
import DevTools from './dev-tools'
import MenuLeft from 'focus-components/menu';

// focus-components
import ConfirmationPopin from 'focus-components/confirmation-popin';
import SnackBar from 'focus-components/snackbar';
import Button from 'focus-components/button';
import ButtonBack from 'focus-components/button-back';
import Icon from 'focus-components/icon';
import Animation from 'focus-components/animation';
import ContentActionsComponent from 'focus-components/header-actions';
// This should be done by default by focus-application
import { headerIsExpandedSelector} from 'focus-application/header/header-reducer';
import { expandHeader, unExpandHeader} from 'focus-application/header/header-actions'
const ConnectedScrollTrigger = connectToStore(headerIsExpandedSelector,{expandHeader, unExpandHeader})(ScrollTrigger);

// Navigation
import {browserHistory} from 'react-router';

// const SB = props => {
//     const {id,content, title, deleteMessage, actionHandler, actionText} = props;
//
//     return (
//         <div className="mdl-js-snackbar mdl-snackbar mdl-snackbar--active animated slideInUp" data-upgraded="MaterialSnackbar" aria-hidden="false">
//             <div className="mdl-snackbar__text">{props.content}</div>
//             {actionHandler && actionText &&
//                 <button className='mdl-snackbar__action' type='button' onClick={() => {actionHandler(props); deleteMessage({id});}}>{actionText}</button>
//             }
//             <button className="mdl-snackbar__action" type="button" onClick={() => deleteMessage({id})}>Close</button>
//         </div>
//     );
// }

const  checkLocation = (path) => {
  const splitPath = path.split('/');
  if(splitPath[4] === 'user' || splitPath[4] === 'finance') {
    return false;
  } else {
    return true;
  }
}

const SummaryTitle = () => <div style={{fontSize: '16px', color: 'white'}}>Focus Tuto V3</div>;

const Summary  = () => {
  const isHome = checkLocation(window.location.href);
  return(
    <div> {isHome ? null : <SummaryTitle />} </div>
  )
}

const BarContentLeft = () => {
  const isHome = checkLocation(window.location.href);
  return(
    <div>
      {isHome ? <SummaryTitle /> :
        <ButtonBack color='white' back={!isHome ? () => browserHistory.goBack() : null}/>
      }
    </div>
  )
}

const BarContentExpanded  = () => <div style={{fontSize: '30px', fontWeight: 'bold', color: 'white'}}>Focus Tuto V3</div>;

const BarContentRight = () => {
  return(
    <Button style={{color: 'white'}} shape='icon' icon='info' hasRipple={false} onClick={() => window.open('https://github.com/get-focus/focus-tuto-v3/tree/final')}/>
  )
}

const ConfirmComponent = props => <ConfirmWrapper {...props}  ConfirmationModal={ConfirmationPopin}/>
const AppMessages = props => <MessageCenter {...props} MessageComponent={SnackBar} />
const AppHeader = props => <Header primaryColor={'#424950'} BarContentSummary={Summary} BarContentExpanded={BarContentExpanded} BarContentLeft={BarContentLeft} BarContentRight={BarContentRight } ContentActionsComponent={ContentActionsComponent} {...props} />

//confirmation-popin
function AppLayout(props) {
  window.scrollTo(0, 0);
  return  (
    <ConnectedScrollTrigger>
      <Layout AppHeader={AppHeader} LoadingBar={LoadingBar} ConfirmWrapper={ConfirmComponent} Menu={MenuLeft} MessageCenter={AppMessages}>
        {props.hasDevtools  && <DevTools />}
        {props.children}
      </Layout>
    </ConnectedScrollTrigger>
  )
};
AppLayout.defaultProps = {
  hasDevtools: true
};
export default AppLayout
