import React from 'react';
import PropTypes from 'prop-types';
import FullScreenDialog, {
  FullScreenDialogContent
} from '../../UI/FullScreenDialog';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { intlShape } from 'react-intl';

import { TAB_INDEXES } from './CommunicatorDialog.constants';
import CommunicatorBoardItem from './CommunicatorBoardItem.component';
import messages from './CommunicatorDialog.messages';

import './CommunicatorDialog.css';
import CommunicatorDialogButtons from './CommunicatorDialogButtons.component';

const CommunicatorDialog = ({
  open,
  intl,
  selectedTab,
  loading,
  boards,
  onClose,
  onTabChange,
  onSearch
}) => (
  <FullScreenDialog
    disableSubmit={true}
    open={open}
    title={intl.formatMessage(messages.title)}
    onClose={onClose}
    buttons={<CommunicatorDialogButtons intl={intl} onSearch={onSearch} />}
  >
    <Paper>
      <FullScreenDialogContent className="CommunicatorDialog__container">
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          className="CommunicatorDialog__tabs"
          fixed="top"
          scrollable
          scrollButtons="off"
        >
          <Tab
            label={intl.formatMessage(messages.communicatorBoards)}
            className={
              selectedTab === TAB_INDEXES.COMMUNICATOR_BOARDS ? 'active' : ''
            }
          />
          <Tab
            label={intl.formatMessage(messages.allBoards)}
            className={selectedTab === TAB_INDEXES.ALL_BOARDS ? 'active' : ''}
          />
          <Tab
            label={intl.formatMessage(messages.myBoards)}
            className={selectedTab === TAB_INDEXES.MY_BOARDS ? 'active' : ''}
          />
        </Tabs>

        <div className="CommunicatorDialog__content">
          {!loading && (
            <React.Fragment>
              {selectedTab === TAB_INDEXES.COMMUNICATOR_BOARDS && (
                <div className="CommunicatorDialog__communicatorData">
                  <React.Fragment>
                    <div className="CommunicatorDialog__communicatorData__title">
                      {intl.formatMessage(messages.title)}
                    </div>
                    <div className="CommunicatorDialog__communicatorData__boardsQty">
                      {intl.formatMessage(messages.boardsQty, {
                        qty: boards.length
                      })}
                    </div>
                  </React.Fragment>
                </div>
              )}

              <div className="CommunicatorDialog__boards">
                {boards.map((board, i) => (
                  <CommunicatorBoardItem
                    key={i}
                    board={board}
                    intl={intl}
                    selectedTab={selectedTab}
                  />
                ))}
              </div>
            </React.Fragment>
          )}

          {loading && (
            <CircularProgress
              size={25}
              className="CommunicatorDialog__spinner"
              thickness={7}
            />
          )}
        </div>
      </FullScreenDialogContent>
    </Paper>
  </FullScreenDialog>
);

CommunicatorDialog.defaultProps = {
  open: false,
  loading: false,
  selectedTab: 0,
  boards: [],
  onClose: () => {},
  onTabChange: () => {},
  onSearch: () => {}
};

CommunicatorDialog.propTypes = {
  boards: PropTypes.array,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  selectedTab: PropTypes.number,
  intl: intlShape,
  onClose: PropTypes.func,
  onTabChange: PropTypes.func,
  onSearch: PropTypes.func
};

export default CommunicatorDialog;