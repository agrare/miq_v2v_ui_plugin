import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'patternfly-react';
import moment from 'moment';

import ScheduleMigrationModalBody from './ScheduleMigrationModalBody';

class ScheduleMigrationModal extends React.Component {
  state = { dateTimeInput: '' };

  render() {
    const {
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl
    } = this.props;

    const handleChange = event => {
      this.setState({ dateTimeInput: event });
    };

    const modalClose = () => {
      toggleScheduleMigrationModal();
      handleChange();
    };

    return (
      <Modal show={scheduleMigrationModal} onHide={modalClose}>
        <Modal.Header>
          <Modal.CloseButton onClick={modalClose} />
          <Modal.Title>{__('Schedule Migration Plan')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScheduleMigrationModalBody handleChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={modalClose}>
            {__('Cancel')}
          </Button>
          <Button
            bsStyle="primary"
            disabled={!this.state.dateTimeInput}
            onClick={() => {
              scheduleMigration({
                plan: scheduleMigrationPlan,
                scheduleTime: moment(this.state.dateTimeInput).format('YYYYMMDDTHHmm')
              }).then(() => {
                fetchTransformationPlansAction({
                  url: fetchTransformationPlansUrl,
                  archived: false
                });
              });
            }}
          >
            {__('Schedule')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ScheduleMigrationModal.propTypes = {
  scheduleMigrationModal: PropTypes.bool,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string
};

export default ScheduleMigrationModal;
