import Page from '@/components/Page/Page'
import Back from '@/components/Back/Back'
import ButtonBack from '@/components/Button/ButtonBack'
import HeaderTitle from '@/components/Title/HeaderTitle'
import ButtonBaseText from '@/components/ButtonBase/ButtonBaseText'

interface PageInputProps {
  title: string
  children: React.ReactNode
}

export default function PageInput({ title, children }: PageInputProps) {
  return (
    <Page
      headerFill
      showNavigation={false}
      headerCenter={<HeaderTitle title={title} />}
      headerRight={<ButtonBaseText text="Done" type="submit" />}
      headerLeft={<Back content={(onClick) => <ButtonBack onClick={onClick} />} />}
    >
      {children}
    </Page>
  )
}
