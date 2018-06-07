/**
 * @module ViewControls
 *
 */ /** */
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { reactControlMapper } from '../ReactControlMapper'
import { styles } from './EditViewStyles'

/**
 * Interface for EditView properties
 */
export interface EditViewProps {
    content,
    history?,
    onSubmit?,
    repository,
    schema,
}

/**
 * View Control for editing a Content, works with a single Content and based on the ReactControlMapper
 *
 * Usage:
 * ```html
 *  <EditView content={selectedContent} history={history} onSubmit={editSubmitClick} />
 * ```
 */
export class EditView extends React.Component<EditViewProps, { content, schema }> {
    /**
     * property
     * @property {string} displayName
     */
    protected displayName: string
    /**
     * constructor
     * @param {object} props
     */
    constructor(props: any) {
        super(props)
        /**
         * @type {object}
         * @property {any} content selected Content
         * @property {any} schema schema object of the selected Content's Content Type
         */
        this.state = {
            content: this.props.content,
            schema: reactControlMapper.getFullSchemaForContentType(this.props.schema.ContentTypeName as any, 'edit'),
        }

        this.handleInputChange = this.handleInputChange.bind(this)

        this.displayName = this.props.content.DisplayName
    }

    /**
     * handle change event on an input
     * @param {SytheticEvent} event
     */
    public handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.state.content[name] = value

        this.setState({
            content: this.props.content,
        })
    }
    /**
     * eturns a value of an input
     * @param {string} name name of the input
     * @return {any} value of the input or null
     */
    public getFieldValue(name) {
        if (this.props.content[name]) {
            return this.props.content[name]
        } else {
            return null
        }
    }
    /**
     * render
     * @return {ReactElement} markup
     */
    public render() {
        const fieldSettings = this.state.schema.fieldMappings
        const that = this
        return (
            <form style={styles.container} onSubmit={
                (e) => {
                    e.preventDefault()
                    if (this.props.onSubmit) {
                        this.props.onSubmit(this.state.content)
                    }
                    if (this.props.history) {
                        this.props.history.goBack()
                    } else {
                        window.history.back()
                    }
                }
            }>
                <Typography variant="headline" gutterBottom>
                    Edit {this.displayName}
                </Typography>
                <Grid container spacing={24}>
                    {
                        fieldSettings.map((e, i) => {
                            if (fieldSettings[i].clientSettings['data-typeName'] === 'ReferenceFieldSetting') {
                                fieldSettings[i].clientSettings['data-repository'] = this.props.repository
                            }
                            return (<Grid item xs={12} style={{ marginBottom: 16 }}
                                sm={12}
                                md={fieldSettings[i].clientSettings['data-typeName'] === 'LongTextFieldSetting' ? 12 : 6}
                                lg={fieldSettings[i].clientSettings['data-typeName'] === 'LongTextFieldSetting' ? 12 : 6}
                                xl={fieldSettings[i].clientSettings['data-typeName'] === 'LongTextFieldSetting' ? 12 : 6}
                                key={fieldSettings[i].clientSettings.name}>
                                {
                                    React.createElement(
                                        fieldSettings[i].controlType,
                                        {
                                            ...fieldSettings[i].clientSettings,
                                            'data-actionName': 'edit',
                                            'data-fieldValue': that.getFieldValue(fieldSettings[i].clientSettings.name),
                                            'onChange': that.handleInputChange,
                                            'content': this.state.content,
                                        })
                                }
                            </Grid>)

                        })
                    }
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right', marginTop: 20 }}>
                        <Button type="submit" variant="raised" color="primary" style={{ color: '#fff', marginRight: 20 }}>Submit</Button>
                        <Button variant="raised" color="secondary">Cancel</Button>
                    </Grid>
                </Grid >
            </form>
        )
    }
}
