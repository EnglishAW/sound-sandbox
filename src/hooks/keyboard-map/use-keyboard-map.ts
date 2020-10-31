import { useEffect, useRef } from 'react'

type KeyMap = Record<string, any>
type KeyMapValue = KeyMap[keyof KeyMap]

type PressedKeys<T = any> = Record<string, T>
type PressedKeyValue = PressedKeys[keyof PressedKeys]

type Props = {
    keyMap: KeyMap
    target?: HTMLElement
    onKeysPressed: (keyMapValue: KeyMapValue) => any
    onKeysRelease?: (pressedKeyValue: PressedKeyValue) => void
}

export function useKeyboardMap({ keyMap, onKeysPressed, onKeysRelease, target }: Props) {
    const DEFAULT_TARGET = document.body
    const _target = target || DEFAULT_TARGET
    const pressedKeys = useRef<PressedKeys>({})

    useEffect(() => {

        // Key Press
        const onKeysPress = (e: KeyboardEvent) => {
            const keyCode = e.code
            if (!pressedKeys.current[keyCode]) {
                if (!!keyMap[keyCode]) {
                    pressedKeys.current[keyCode] = onKeysPressed(keyMap[keyCode])
                }
            }
        }
        _target.addEventListener('keypress', onKeysPress)

        // Key Up
        const onKeyUp = (e: any) => {
            const keyCode = e.code
            if (pressedKeys.current[keyCode]) {
                !!onKeysRelease && onKeysRelease(pressedKeys.current[keyCode])

                delete pressedKeys.current[keyCode]
            }
        }
        _target.addEventListener('keyup', onKeyUp)

        return () => {
            _target.removeEventListener('keypress', onKeysPress)
            _target.removeEventListener('keyup', onKeyUp)
        }
    }, [keyMap, onKeysPressed, onKeysRelease, _target])

    return null

}
