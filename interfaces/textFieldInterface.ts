export interface TextField {
    label: string;
    title: string;
    attribute: string;
    keyboardType: KeyboardEvent;
    secure: boolean;
    onChange: (text: string) => {};
}