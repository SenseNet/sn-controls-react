/**
 * @module FieldControls
 *
 */ /** */
import React, { Component } from 'react'
import { ReactBinaryFieldSetting } from '../BinaryFieldSetting'
import { ReactClientFieldSetting, ReactClientFieldSettingProps } from '../ClientFieldSetting'

import { Input } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Typography from '@material-ui/core/Typography'
import { GenericContent } from '@sensenet/default-content-types'
import Radium from 'radium'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    label: {
        color: 'rgba(0, 0, 0, 0.54)',
        padding: 0,
        fontSize: '12px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: 1,
    },
    value: {
        fontStyle: 'italic',
    },
}

/**
 * Interface for Name properties
 */
export interface FileUploadProps<T extends GenericContent, K extends keyof T> extends ReactClientFieldSettingProps<T, K>, ReactClientFieldSetting<T, K>, ReactBinaryFieldSetting<T, K> { }
/**
 * Interface for Name state
 */
export interface FileUploadState {
    value: string,
    error: string,
    path: string,
    buttonText: string,
}
/**
 * Field control that represents a FileUpload field. Available values will be populated from the FieldSettings.
 */
@Radium
export class FileUpload<T extends GenericContent, K extends keyof T> extends Component<FileUploadProps<T, K>, FileUploadState> {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props: FileUploadProps<T, K>) {
        super(props)
        /**
         * @type {object}
         * @property {string} value input value
         */
        this.state = {
            value: this.setValue(this.props['data-fieldValue']).toString(),
            error: '',
            path: this.props.value || '',
            buttonText: this.props.value ? 'Change' : 'Add',
        }

        this.handleChange = this.handleChange.bind(this)
    }
    /**
     * convert incoming default value string to proper format
     * @param {string} value
     */
    public setValue(value: string) {
        if (value) {
            return value.replace(/<[^>]*>/g, '')
        } else {
            if (this.props['data-defaultValue']) {
                return this.props['data-defaultValue']
            } else {
                return ''
            }
        }
    }
    /**
     * Handles input changes. Dispatches a redux action to change field value in the state tree.
     * @param e
     */
    public handleChange(e: React.ChangeEvent) {
        const { onChange } = this.props
        // tslint:disable-next-line:no-string-literal
        const value = e.target['value']
        this.setState({ value })
        onChange(this.props.name, value)
    }
    /**
     * Removes the saved reference
     */
    public removeValue = () => {
        this.setState({
            value: '',
            path: '',
            buttonText: 'Upload',
        })
    }
    /**
     * returns a name from the given path
     */
    public getNameFromPath = (path: string) =>
        path.replace(/^.*[\\\/]/, '')
    /**
     * render
     * @return {ReactElement} markup
     */
    public render() {
        switch (this.props['data-actionName']) {
            case 'edit':
                return (
                    // change upload és ref csere (kérdés, hogy törlődjön-e a korábbi ref file)
                    <FormControl className={this.props.className} style={styles.root as any} key={this.props.name as string} component="fieldset" required={this.props.required}>
                        <label style={styles.label} htmlFor={this.props.name as string}>{this.props['data-labelText']}</label>
                        <Typography variant="body1" style={styles.value}>{this.state.path.length > 0 ? this.state.path : this.props['data-placeHolderText']}</Typography>

                        <div style={{ display: 'table-row' }}>
                            <div style={{ position: 'relative', display: 'table-cell', minWidth: 100 }}>
                                <InputLabel htmlFor="raised-button-file" style={{ transform: 'translate(0, 4px) scale(1)' }}>
                                    <Button variant="raised" component="span" color="primary">
                                        {this.state.buttonText}
                                  </Button>
                                </InputLabel>
                            </div>
                            <div style={{ display: 'table-cell' }}>
                                <Button
                                    component="span"
                                    color="secondary"
                                    style={{ transform: 'translate(0, 4px) scale(1)' }}
                                    onClick={() => this.removeValue()}>
                                    Remove
                              </Button>
                            </div>
                        </div>
                        <Input
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                        />
                    </FormControl>
                )
            case 'new':
                return (
                    // feltöltés után látszódik a referencia
                    <FormControl className={this.props.className} style={styles.root as any} key={this.props.name as string} component="fieldset" required={this.props.required}>
                        <label style={styles.label} htmlFor={this.props.name as string}>{this.props['data-labelText']}</label>
                        <Typography variant="body1" style={styles.value}>{this.state.path.length > 0 ? this.state.path : this.props['data-placeHolderText']}</Typography>
                        <div style={{ position: 'relative' }}>
                            <InputLabel htmlFor="raised-button-file" style={{ transform: 'translate(0, 4px) scale(1)' }}>
                                <Button variant="raised" component="span" color="primary">
                                    Upload
                              </Button>
                            </InputLabel>
                        </div>
                        <Input
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                        />
                    </FormControl>
                )
            case 'browse':
                return (
                    this.props.value && this.props.value.length > 0 ? <div className={this.props.className}>
                        <Typography variant="caption" gutterBottom>
                            {this.props['data-labelText']}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <a href={this.props.value}>{this.getNameFromPath(this.props.value)}</a>
                        </Typography>
                    </div> : null
                )
            default:
                return (
                    this.props.value && this.props.value.length > 0 ? <div className={this.props.className}>
                        <Typography variant="caption" gutterBottom>
                            {this.props['data-labelText']}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <a href={this.props.value}>{this.getNameFromPath(this.props.value)}</a>
                        </Typography>
                    </div> : null
                )
        }

    }
}
