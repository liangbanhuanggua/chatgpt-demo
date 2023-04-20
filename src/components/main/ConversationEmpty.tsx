import ConversationEdit from '../conversations/ConversationEdit'
import type { Conversation } from '@/types/conversation'

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  return (
    <div class="h-full max-w-md mx-12 sm:mx-18 py-16 overflow-hidden">
      <ConversationEdit conversation={props.conversation} />
    </div>
  )
}
