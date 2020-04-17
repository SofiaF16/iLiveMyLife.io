import React from 'react';
import { Mutation } from 'react-apollo';
import { Input } from "antd";
import {ADD_ITEM} from "../graphql/item";

class ItemSender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            value: '',
        };
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleSubmit = async (mutate) => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            isSubmitting: true,
        });

        const response = await mutate({ variables: { itemId: this.props.itemId, title: this.state.value } });

        this.setState({
            isSubmitting: false,
            value: ''
        });

        this.element.focus();
    };

    render() {
        return (
            <Mutation mutation={ADD_ITEM}>
                {
                    (mutate, { client }) => (
                        <Input
                            ref={(element) => {
                                this.element = element;
                            }}
                            onPressEnter={async () => this.handleSubmit(mutate)}
                            onChange={this.handleChange}
                            name="item"
                            disabled={this.state.isSubmitting}
                            value={this.state.value}
                            placeholder="What is in your mind? What needs to be done? Any idea to research? Some task to share?"
                        />)
                }
            </Mutation>
        );
    }
}

export default ItemSender;