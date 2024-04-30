const html = `%3Cdiv%20id%3D%22storybook-root%22%3E%3Carticle%20itemscope%3D%22%22%20itemtype%3D%22https%3A%2F%2Fschema.org%2FPerson%22%20id%3D%22globalPerson%22%3E%0A%20%20%3Carticle%20itemprop%3D%22alumniOf%22%20itemscope%3D%22%22%20itemtype%3D%22https%3A%2F%2Fschema.org%2FOrganization%22%3E%0A%20%20%20%20%3Cdetails%3E%0A%20%20%20%20%20%20%3Csummary%20itemprop%3D%22name%22%3EIBM%20Watson%3C%2Fsummary%3E%0A%20%20%20%20%20%20%3Cp%20itemprop%3D%22url%22%3E%3Ca%20href%3D%22https%3A%2F%2Fwww.ibm.com%2Fwatson%22%3Ewww.ibm.com%2Fwatson%3C%2Fa%3E%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cdiv%20itemprop%3D%22description%22%3E%3Cp%3EWatson%20sparked%20curiosity%20around%20%E2%80%9Cmachines%20that%20could%20think%E2%80%9D%20and%20opened%20up%20the%20possibilities%20around%20how%20AI%20could%20be%20applied%20to%20business.%3C%2Fp%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cp%20itemprop%3D%22location%22%3ENew%20York%2C%20NY%3C%2Fp%3E%0A%20%20%20%20%3C%2Fdetails%3E%0A%20%20%20%20%3Csection%20itemprop%3D%22employee%22%20itemscope%3D%22%22%20itemtype%3D%22https%3A%2F%2Fschema.org%2FPerson%22%3E%0A%20%20%20%20%3Ch4%20itemprop%3D%22role%22%3ESenior%20Frontend%20Developer%3C%2Fh4%3E%0A%20%20%20%20%3Cp%3E%3Ctime%20datetime%3D%222016-01-01%22%20itemprop%3D%22startDate%22%3EJan%202016%3C%2Ftime%3E%20%E2%80%93%20%3Ctime%20datetime%3D%222017-01-01%22%20itemprop%3D%22endDate%22%3EJan%202017%3C%2Ftime%3E%3C%2Fp%3E%0A%20%20%20%20%3Cdiv%20itemprop%3D%22description%22%3E%3Cp%3EStreamlined%20access%20to%20Watson%20developer%20documentation%20by%20creating%20a%20new%20open-source%20content%20management%20system.%3C%2Fp%3E%3C%2Fdiv%3E%0A%20%20%20%20%0A%20%20%20%20%20%20%3Cul%20itemprop%3D%22responsibilities%22%3E%0A%20%20%20%20%20%20%20%20%3Cli%3E%3Cp%3EPartnered%20with%20the%20design%20team%20tasked%20with%20creating%20a%20developer-centric%20and%20accessible%20documentation%20site%20adhering%20to%20IBM%20Watson%20AI%20development%20teams%E2%80%99s%20technical%20specs%2C%20reducing%208%20distributed%20systems%20to%201%3C%2Fp%3E%3C%2Fli%3E%3Cli%3E%3Cp%3ELead%20architect%20the%20end-to-end%20completion%20of%20a%20full-stack%20open-source%20project%2C%20Punchcard%20CMS%2C%20which%20required%20backend%20functionality%20for%20immutable%20data%2C%20content%20versioning%2C%20and%20subscribe-able%20publishing%20gateways.%3C%2Fp%3E%3C%2Fli%3E%0A%20%20%20%20%20%20%3C%2Ful%3E%0A%20%20%20%20%0A%20%20%20%20%3C%2Fsection%3E%0A%20%20%3C%2Farticle%3E%3C%2Farticle%3E%3C%2Fdiv%3E%0A%20%20`
// console.log(html)

export async function getValidationResponse(url) {
  try {
    const response = await fetch('https://validator.schema.org/validate', {
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `html=${html}`,
      method: 'POST',
    })

    if (!response.ok) {
      console.error(`Received a ${response.statusText}`)
      return ''
    }

    const text = await response.text()

    return text
  } catch (err) {
    console.error(`Failed to get validation response for ${url}`, err)
    return ''
  }
}
async function caller() {
  const resp = await getValidationResponse('https://scottnath.com/whoami/')
  console.log('res', resp)

  const json = resp.substring(resp.indexOf('\n'))
  const res = JSON.parse(json)
  console.log('res', JSON.stringify(res.tripleGroups, null, 2))
  // const validationResult = validationResultSchema.parse(JSON.parse(json));
}

caller()
