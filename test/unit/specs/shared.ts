import sleep from 'yaku/lib/sleep'
import Option from '@/components/Option.vue'
import { INPUT_DEBOUNCE_DELAY } from '@/constants'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'

export function $(selector, context = document) {
  return context.querySelector(selector)
}

function createArray(len: number, fn: (i: number) => any) {
  const arr = []
  let i = 0
  while (i < len) arr.push(fn(i++))
  return arr
}

export function generateOptions(maxLevel: number) {
  const generate = (i, level) => {
    const id = String.fromCharCode(97 + i).repeat(level)
    const option = { id, label: id.toUpperCase() }
    if (level < maxLevel) (option as any).children = [ generate(i, level + 1) ]
    return option
  }

  return createArray(maxLevel, i => generate(i, 1))
}

function createKeyObject(keyCode: number) {
  return { which: keyCode, keyCode }
}

export function leftClick(wrapper: VueWrapper<any> | DOMWrapper<Element>) {
  const MOUSE_BUTTON_LEFT = { button: 0 }
  wrapper.trigger('mousedown', MOUSE_BUTTON_LEFT)
}

export function pressBackspaceKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_BACKSPACE = createKeyObject(8)
  input.trigger('keydown', KEY_BACKSPACE)
}

export function pressEnterKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_ENTER = createKeyObject(13)
  input.trigger('keydown', KEY_ENTER)
}

export function pressEscapeKey(wrapper: VueWrapper<any>, modifierKey: string) {
  const input = findInput(wrapper)
  const KEY_ESCAPE = createKeyObject(27)
  let eventData = KEY_ESCAPE
  if (modifierKey) eventData = { ...KEY_ESCAPE, [modifierKey]: true }
  input.trigger('keydown', eventData)
}

export function pressEndKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_END = createKeyObject(35)
  input.trigger('keydown', KEY_END)
}

export function pressHomeKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_HOME = createKeyObject(36)
  input.trigger('keydown', KEY_HOME)
}

export function pressArrowLeft(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const ARROW_LEFT = createKeyObject(37)
  input.trigger('keydown', ARROW_LEFT)
}

export function pressArrowUp(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const ARROW_UP = createKeyObject(38)
  input.trigger('keydown', ARROW_UP)
}

export function pressArrowRight(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const ARROW_RIGHT = createKeyObject(39)
  input.trigger('keydown', ARROW_RIGHT)
}

export function pressArrowDown(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const ARROW_DOWN = createKeyObject(40)
  input.trigger('keydown', ARROW_DOWN)
}

export function pressDeleteKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_DELETE = createKeyObject(46)
  input.trigger('keydown', KEY_DELETE)
}

export function pressAKey(wrapper: VueWrapper<any>) {
  const input = findInput(wrapper)
  const KEY_A = createKeyObject(65)
  input.trigger('keydown', KEY_A)
}

export async function typeSearchText(wrapper: VueWrapper<any>, text: string) {
  const $input = findInput(wrapper)
  ;($input.element as HTMLInputElement).value = text
  $input.trigger('input')
  expect(wrapper.vm.$refs.control.$refs['value-container'].$refs.input.value).toBe(text)
  await sleep(INPUT_DEBOUNCE_DELAY + 1)
  expect(wrapper.vm.trigger.searchQuery).toBe(text)
}

export function findInputContainer(wrapper: VueWrapper<any>) {
  return wrapper.find('.vue-treeselect__input-container')
}

export function findInput(wrapper: VueWrapper<any>) {
  return wrapper.find('.vue-treeselect__input')
}

export function findMenuContainer(wrapper: VueWrapper<any>) {
  return wrapper.find('.vue-treeselect__menu-container')
}

export function findMenu(wrapper: VueWrapper<any>) {
  return wrapper.find('.vue-treeselect__menu')
}

export function findVisibleOptions(wrapper: VueWrapper<any>) {
  return wrapper.findAll('.vue-treeselect__option:not(.vue-treeselect__option--hide)')
}

export function findOptionByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return wrapper.find(`.vue-treeselect__option[data-id="${nodeId}"]`)
}

export function findOptionArrowContainerByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return findOptionByNodeId(wrapper, nodeId).find('.vue-treeselect__option-arrow-container')
}

export function findOptionArrowByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return findOptionByNodeId(wrapper, nodeId).find('.vue-treeselect__option-arrow')
}

export function findCheckboxByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return findOptionByNodeId(wrapper, nodeId).find('.vue-treeselect__checkbox')
}

export function findLabelContainerByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return findOptionByNodeId(wrapper, nodeId).find('.vue-treeselect__label-container')
}

export function findLabelByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return findOptionByNodeId(wrapper, nodeId).find('.vue-treeselect__label')
}

export function findChildrenOptionListByNodeId(wrapper: VueWrapper<any>, nodeId: string) {
  return wrapper.findAllComponents(Option)
    .find(optionWrapper => optionWrapper.vm.node.id === nodeId)
    .find('.vue-treeselect__list')
}
