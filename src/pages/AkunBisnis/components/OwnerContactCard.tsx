import { Mail } from 'lucide-react'
import { useId } from 'react'

import { Card } from '@/components/ui/Card'

import type { BusinessFormValues } from '../akunBisnisData'
import { TextField } from './FormFields'

interface OwnerContactCardProps {
  values: BusinessFormValues
  onChange: (field: keyof BusinessFormValues, value: string) => void
}

export function OwnerContactCard({ values, onChange }: OwnerContactCardProps) {
  const id = useId()

  return (
    <Card className="p-5" label="Kontak pemilik">
      <div className="border-b border-border pb-[15px]">
        <h2 className="text-[15px] leading-[18px] font-bold text-heading">Kontak pemilik</h2>
        <p className="pt-1 text-[11px] leading-3 text-body">
          Kontak utama untuk notifikasi akun dan insight.
        </p>
      </div>

      <div className="grid gap-x-4 gap-y-[14px] pt-[17px] sm:grid-cols-2">
        <TextField
          id={`${id}-owner-name`}
          label="Nama pemilik"
          value={values.ownerName}
          autoComplete="name"
          onChange={(value) => onChange('ownerName', value)}
        />
        <TextField
          id={`${id}-owner-role`}
          label="Peran"
          value={values.ownerRole}
          autoComplete="organization-title"
          onChange={(value) => onChange('ownerRole', value)}
        />
        <TextField
          id={`${id}-email`}
          label="Alamat email"
          type="email"
          value={values.email}
          autoComplete="email"
          icon={Mail}
          onChange={(value) => onChange('email', value)}
        />
        <TextField
          id={`${id}-phone`}
          label="Nomor telepon"
          type="tel"
          value={values.phone}
          autoComplete="tel"
          onChange={(value) => onChange('phone', value)}
        />
      </div>
    </Card>
  )
}
