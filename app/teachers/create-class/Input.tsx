"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import pb from "@/lib/pocketbase"

type Inputs = {
	title: string
	pac: number
	year: number
	semister: number
}

export default function Input() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const classData = {
			title: data.title,
			pac: Number(data.pac),
			teacher: pb.authStore.model?.id,
			year: Number(data.year),
			semister: Number(data.semister),
		}

		const record = await pb.collection("classes").create(classData)
		if (record.id) {
			router.push("/teachers")
		} else {
			console.log(record)
		}
	}

	const date = new Date()
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>수업명</div>
				<input {...register("title")} />
				<div>Pac</div>
				<input {...register("pac")} />
				<select {...register("year")}>
					<option value={date.getFullYear()}>{date.getFullYear()}</option>
					<option value={date.getFullYear() + 1}>{date.getFullYear() + 1}</option>
				</select>

				<select {...register("semister")}>
					<option value={1}>1학기</option>
					<option value={2}>2학기</option>
				</select>

				<button type="submit">생성</button>
			</form>
		</div>
	)
}
