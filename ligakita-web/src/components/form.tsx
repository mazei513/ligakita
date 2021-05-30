

type FormErrorTextProps = {
    children?: React.ReactNode
}

export function FormErrorText({ children }: FormErrorTextProps) {
    return <div className="text-red-600 col-start-2 col-span-2">{children}</div>;
}

type FormActionsProps = {
    children?: React.ReactNode
}

export function FormActions({ children }: FormActionsProps) {
    return <div className="flex flex-row justify-end">
        {children}
    </div>
}

export type FormInputTextProps = {
    name: string
    value: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    after?: React.ReactNode
}

export function FormInputText({ name, value, onChange, after }: FormInputTextProps) {
    return <span className="col-span-2">
        <input
            className="border-blue-300 focus:border-blue-500 border-2 rounded-lg p-1"
            name={name}
            type="text"
            value={value}
            onChange={onChange}
        />
        {after}
    </span>;
}

type FormInputSubmitProps = {
    color?: string
    value: string
}

export function FormInputSubmit({ value, color = "gray" }: FormInputSubmitProps) {
    return <input
        className={`border-${color}-400 hover:border-${color}-500 active:border-${color}-600 border-2 rounded-lg p-1 bg-${color}-200 active:bg-${color}-300 outline-none focus:outline-none m-1`}
        type="submit"
        value={value}
    />;
}

type ButtonProps = {
    color?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode
}

export function Button({ onClick, children, color = "gray" }: ButtonProps) {
    return <button
        className={`border-${color}-400 hover:border-${color}-500 active:border-${color}-600 border-2 rounded-lg p-1 bg-${color}-200 active:bg-${color}-300 outline-none focus:outline-none`}
        onClick={onClick}>
        {children}
    </button>
}

type FormGroupProps = {
    children?: React.ReactNode
}

export function FormGroup({ children }: FormGroupProps) {
    return <div className="grid grid-cols-3">
        {children}
    </div>
}

type FormLabelProps = {
    children: React.ReactNode
    htmlFor: string
}

export function FormLabel({ children, htmlFor }: FormLabelProps) {
    return <label htmlFor={htmlFor}>{children}</label>
}
