import React from "react";

function FormItem(props) {
    const switchForm = () => {
        const { label, tipe, placeholder, items, value, onChange } = props;
        switch (tipe) {
            case "select":
                return (
                    <select
                        onChange={onChange}
                        className={`form-control ${
                            props.errorMsg && "is-invalid"
                        }`}
                        disabled={props.disabled}
                        id="inputGroupSelect01"
                    >
                        <option selected>Pilih...</option>
                        {items.map((item) => {
                            return (
                                <option
                                    selected={
                                        item.value == value ? true : false
                                    }
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            );
                        })}
                    </select>
                );
            case "textarea":
                return (
                    <textarea
                        className={`form-control ${
                            props.errorMsg && "is-invalid"
                        }`}
                        disabled={props.disabled}
                        placeholder={placeholder}
                        id="floatingTextarea"
                        defaultValue={value}
                        onChange={onChange}
                    />
                );
            default:
                return (
                    <input
                        type={tipe}
                        className={`form-control ${
                            props.errorMsg && "is-invalid"
                        }`}
                        disabled={props.disabled}
                        placeholder={placeholder}
                        aria-label={label}
                        id="floatingInputInvalid"
                        defaultValue={value}
                        onChange={onChange}
                        aria-describedby="basic-addon1"
                    />
                );
        }
    };

    return (
        <React.Fragment>
            <div className="form-floating">
                {switchForm(props)}
                <label for="floatingInputInvalid">{props.label}</label>
            </div>
            {/* {props.errorMsg && (
                <span style={{ color: "red" }}>{props.errorMsg}</span>
            )}{" "} */}
            <br />
        </React.Fragment>
    );
}

export default FormItem;
