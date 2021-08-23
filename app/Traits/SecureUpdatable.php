<?php

namespace App\Traits;

/**
 * Trait SecureUpdatable
 * Allows to secure update without override the existing fields in a model
 * This dependes on the $fillable and $guarded attributes too
 * @package App\Traits
 */
trait SecureUpdatable
{
    /** @method static $this updateBlankOrCreate($hashedId, array $columns = []) */

    /**
     * @param $attributes
     * @param $values
     * @return \Illuminate\Database\Eloquent\Model|$this
     */
    public static function updateBlankOrCreate($attributes, $values)
    {
        /** @var \Illuminate\Database\Eloquent\Model $model */
        $model = static::firstOrNew($attributes);

        $blankValues = collect($values)->filter(function ($fieldValue, $fieldName) use ($model) {
            /** @var \Illuminate\Database\Eloquent\Model $model */
            return blank($model->getAttribute($fieldName));
        })->toArray();

        $model->fill($blankValues)->save();

        return $model;
    }
}