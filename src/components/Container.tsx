import {PropsWithChildren} from "react";
import classNames from "classnames"

interface IContainerProps extends PropsWithChildren {
    className?: string
}

const Container = (props: IContainerProps) => {
    return (
        <section
            {...props}
            className={classNames(
                "max-w-[1200px] m-auto px-[12px] xs:px-[16px] xl:px-[0px]",
                props.className,
            )}
        />
    )
}

export default Container