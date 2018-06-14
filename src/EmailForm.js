import React from 'react';
import { css } from 'react-emotion';
import { Form, Input, Button, Icon, Row, Col } from 'antd';

const FormClassName = css({
  marginTop: 40,
});

const FullWidthClassName = css({
  width: 'calc(100% - 8px)',
  '.ant-form-item-control-wrapper': { width: 'calc(100% - 8px)' },
});

const FormItemButtonClassName = css({
  width: '100%',
  '.ant-form-item-control-wrapper': {
    width: '100%',
  },
  '.ant-form-item-control-wrapper button.ant-btn': {
    width: '100%',
  },
});

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EmailForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email } = values;
        this.props.onSubmit(email);
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        className={FormClassName}
      >
        <Row>
          <Col span={20}>
            <FormItem
              className={FullWidthClassName}
              validateStatus={emailError ? 'error' : ''}
              help={emailError || ''}
            >
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="email"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem className={FormItemButtonClassName}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Enter
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedEmailForm = Form.create()(EmailForm);
export default WrappedEmailForm;
