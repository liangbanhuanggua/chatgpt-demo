import { For, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import {
  addConversation,
  currentEditingConversation,
  updateConversationById,
} from '@/stores/conversation'
import { showConversationEditModal } from '@/stores/ui'
import { providerMetaList } from '@/stores/provider'
import { Select } from '@/components/ui/base'
import type { Conversation, ConversationType } from '@/types/conversation'

const typeSelectList = [
  {
    value: 'continuous' as const,
    label: 'Continuous Conversation',
    icon: 'i-carbon-edt-loop',
  },
  {
    value: 'single' as const,
    label: 'Single Conversation',
    icon: 'i-carbon-connect',
  },
  {
    value: 'image' as const,
    label: 'Image Generation',
    icon: 'i-carbon-image',
  },
]

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  let inputRef: HTMLInputElement
  const $currentEditingConversation = useStore(currentEditingConversation)
  const [currentEditingId, setCurrentEditingId] = createSignal('')
  const [selectConversationType, setSelectConversationType] = createSignal<ConversationType>('continuous')
  const [selectProviderId, setSelectProviderId] = createSignal(providerMetaList[0]?.id)
  const selectProvider = () => providerMetaList.find(item => item.id === selectProviderId()) || null

  const handleProviderChange = (id: string) => {
    setSelectProviderId(id)
    setSelectConversationType(selectProvider()?.supportConversationType[0] || 'continuous')
  }

  const handleOpenIconSelector = () => {
    // TODO: Icon selector by `emoji-mart`
  }

  const handleOpenSystemInfoSettings = () => {
    // TODO
  }

  const handleOpenMockMessages = () => {
    // TODO
  }

  return (
    <div class="flex flex-col gap-4">
      <div
        class="w-16 h-16 border border-base rounded-xl border-dashed hv-base"
        onClick={handleOpenIconSelector}
      />
      <input
        type="text"
        class="font-semibold mr-12 px-1 truncate outline-0 bg-transparent placeholder:op-40"
        placeholder="Untitled"
        value={props.conversation.name}
        onBlur={e => updateConversationById(props.conversation.id, { name: e.currentTarget.value })}
      />
      <div />
      <div class="py-1 border bg-base-50 border-base rounded-lg text-sm">
        <div class="fi justify-between gap-10 px-4 h-10">
          <h3 class="op-80 shrink-0">Provider</h3>
          <Select
            options={providerMetaList.map(item => ({ value: item.id, label: item.name, icon: item.icon }))}
            value={selectProviderId}
            setValue={handleProviderChange}
          />
        </div>
        <div class="fi justify-between gap-10 px-4 h-10">
          <h3 class="op-80 shrink-0">Conversation Type</h3>
          <Select
            options={providerMetaList.map(item => ({ value: item.id, label: item.name, icon: item.icon }))}
            value={selectProviderId}
            setValue={handleProviderChange}
          />
        </div>
      </div>
      <div class="py-1 border bg-base-50 border-base rounded-lg text-sm">
        <div class="fi justify-between gap-10 pl-4 pr-2 h-10">
          <h3 class="op-80 shrink-0">System Info</h3>
          <div class="fi overflow-hidden px-2 py-1 cursor-pointer" onClick={handleOpenSystemInfoSettings}>
            <p class="text-xs op-50 truncate">You are a helpful assistant You are a helpful assistant.You are a helpful assistant.</p>
            <div i-carbon-chevron-right class="shrink-0" />
          </div>
        </div>
        <div class="fi justify-between gap-10 pl-4 pr-2 h-10">
          <h3 class="op-80 shrink-0">Mock Messages</h3>
          <div class="fi overflow-hidden px-2 py-1 cursor-pointer" onClick={handleOpenMockMessages}>
            <p class="text-xs op-50 truncate">2 messages</p>
            <div i-carbon-chevron-right class="shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
