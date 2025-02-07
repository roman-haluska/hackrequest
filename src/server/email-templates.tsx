import { Body, Container, Head, Html, Link, Preview, Section, Text } from '@react-email/components'

type DropboxResetPasswordEmailProps = {
    userName?: string
    eventName?: string
    eventDate?: string
}

export const EventRegistrationEmail = ({
    userName: userName,
    eventName,
    eventDate,
}: DropboxResetPasswordEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Ďakujeme za registráciu na podujatie {eventName ?? ''}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Text style={text}>Dobrý deň {userName},</Text>
                        <Text style={text}>
                            ďakujeme za Vašu registráciu na podujatie {eventName}, ktoré sa uskutoční {eventDate}.
                        </Text>
                        <Text style={text}>V prípade akýchkoľvek otázok nás neváhajte kontaktovať.</Text>
                        <Text style={text}>
                            Pre viac informácií navštívte našu{' '}
                            <Link style={anchor} href='https://osasport.sk/'>
                                webovú stránku
                            </Link>
                        </Text>
                        <Text style={text}>Tešíme sa na Vás!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

EventRegistrationEmail.PreviewProps = {
    userName: 'Peter',
    eventName: 'Konferencia 2024',
    eventDate: '15. apríla 2024',
} as DropboxResetPasswordEmailProps

export default EventRegistrationEmail

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
}

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
}

const text = {
    fontSize: '16px',
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
}

const anchor = {
    textDecoration: 'underline',
}
