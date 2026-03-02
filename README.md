# AlertComponent

## Installation

You can add this package to your project by using these options:

#### yarn:
```bash
  yarn add @fluffys/alertcomponent
```

#### npm:
```bash
  npm i @fluffys/alertcomponent
```

## Usage

Add the AlertComponent to the component of your choice and set an origin.
```tsx
import {AlertComponent} from "@fluffys/alertcomponent";

function App() {
    
    return (
        <>
            <AlertComponent origin={"Main-Window"}/>
        </>
    )
}
```

### Optional Props

The AlertComponent accepts the following optional props:

- __ignoreParentComponentPosition:__ If true, the component will always open centered at the top of the screen and will not be attached to the parent component.
- __sx:__ Custom styling for the Alert component using MUI's SxProps.
- __icon:__ Custom icon to override the default severity icon.

```tsx
<AlertComponent 
    origin={"Main-Window"}
    ignoreParentComponentPosition={true}
    icon={<CustomIcon />}
    sx={{ backgroundColor: 'lightblue' }}
/>
```

To send a message to an AlertComponent, you can import and use the MessengerHelper helper tool.

```tsx
import {MessengerHelper} from "@fluffys/alertcomponent";
//...
const messengerHelper = new MessengerHelper();

messengerHelper.sendMessage({
    message: "Hello World",
    severity: "success",
    duration: 1000,
    destination: "Main-Window"
})

// Optionally with custom icon
messengerHelper.sendMessage({
    message: "Custom Icon Alert",
    severity: "info",
    duration: 2000,
    destination: "Main-Window",
    customIcon: <CustomIcon />
})
//...
```

## Important to know

This is the base layout of a message:

- __message:__ is containing alert content
- __severity:__ contains the type of alert
- __duration:__ contains number of seconds in milliseconds (is not needed)
- __destination:__ contains string where it should appear __(must match with any AlertComponent origin)__
- __customIcon:__ optional custom icon to override the default severity icon (is not needed)
```tsx
export interface AlertMessage {
    message: string;
    severity: "success" | "warning" | "error" | "info";
    duration?: number | undefined;
    destination: string;
    customIcon?: React.ReactNode;
}
```

## Optional Usage

The Message helper is basically just a broadcast channel. As long as you name it "triggerAlert" and respect the message layout, it will work.
```ts
channel = new BroadcastChannel("triggerAlert");

channel.postMessage({
    message: "Hello World",
    severity: "success",
    duration: 1000,
    destination: "Main-Window",
    customIcon: <YourCustomIcon /> // optional
});
```

## License

[MIT](https://choosealicense.com/licenses/mit/)