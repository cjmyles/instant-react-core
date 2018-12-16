# Instant React Core

Core `instant-react` functionality, including components, forms, redux modules and utilities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [removeUndefineds](#removeundefineds)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this package using npm:

```bash
$ npm install instant-react-core
```

## Usage

Here is a quick example to get you started:

**ES Modules**

```javascript
import Alert from 'instant-react-core/components/Alert';

function App() {
  return <Alert variant="success" />;
}
```

**CommonJS Modules**

```javascript
const Alert = require('instant-react/components/Alert');

function App() {}
  return <Alert variant="success"/>
}
```

## API

### Components

Extends [Material-UI](https://material-ui.com/) components.

#### Alert

#### AppBar

#### AppliedRoute

#### DatePicker

#### FileUploaded

#### FileUploading

#### ForgotPasswordPanel

#### ImageDialog

#### ImageList

#### LoadingPanel

#### Map

#### PageHeading

#### PageNotFound

#### Phone

#### ProgressButton

#### ScreenMessage

#### Sidebar

#### Signature

#### SignIn

#### SignInPanel

#### Snackbar

#### Thumbnail

#### TimePicker

#### UnauthenticatedRoute

#### UploadFiles

### Forms

Extends [Redux Form](https://redux-form.com/) fields.

#### Address

#### AddressAutocomplete

#### AddressWithAutocomplete

#### Checkbox

#### DatePicker

#### Email

#### FullName

#### PhoneNumber

#### RadioGroup

#### Signature

#### TextField

#### TimePicker

#### UploadFiles

### Layouts

#### Default

### Redux

Utilises [Redux](https://www.npmjs.com/package/redux), [Redux Thunk](https://www.npmjs.com/package/redux-thunk) and [Redux Localstorage](https://www.npmjs.com/package/redux-localstorage)

#### reducers

#### selectors

#### store

### Utils

#### component

#### firebase

#### form

#### request

## Contributing

We'd greatly appreciate any [contribution](CONTRIBUTING.md) you make.

## License

[MIT](LICENSE)
